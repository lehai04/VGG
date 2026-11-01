import test from "node:test";
import assert from "node:assert/strict";

test(
  "consultation administration: real database, auth, private data, status history and concurrency",
  { skip: !process.env.ADMIN_TEST_DATABASE_URL },
  async () => {
    process.env.DATABASE_URL = process.env.ADMIN_TEST_DATABASE_URL;
    process.env.PUBLIC_APP_URL = "http://localhost:3000";
    process.env.CMS_APP_URL = "http://localhost:3001";
    process.env.NODE_ENV = "test";
    const { buildApp } = await import("../dist/app.js");
    const { prisma } = await import("../dist/shared/database/prisma.js");
    const { hashPassword, tokenHash } =
      await import("../dist/modules/consultation-admin/password.js");
    const app = await buildApp();
    const headers = { origin: "http://localhost:3001", "x-vgg-admin": "1" };
    const password = "Integration-only-password-294!";
    const passwordHash = await hashPassword(password);
    try {
      const writer = await prisma.consultationStaff.create({
        data: {
          email: "writer@example.test",
          fullName: "Cán bộ kiểm thử",
          passwordHash,
        },
      });
      await prisma.consultationStaff.create({
        data: {
          email: "viewer@example.test",
          fullName: "Chỉ xem",
          passwordHash,
          canUpdate: false,
        },
      });
      assert.equal(
        (await app.inject({ url: "/api/admin/consultations" })).statusCode,
        401,
      );
      assert.equal(
        (
          await app.inject({
            method: "POST",
            url: "/api/admin/login",
            payload: { email: writer.email, password },
          })
        ).statusCode,
        403,
      );
      assert.equal(
        (
          await app.inject({
            method: "POST",
            url: "/api/admin/login",
            headers,
            payload: { email: writer.email, password: "incorrect" },
          })
        ).statusCode,
        401,
      );
      assert.equal((await app.inject({ method: "POST", url: "/api/admin/login", headers: { ...headers, origin: "http://localhost:3000" }, payload: { email: writer.email, password } })).statusCode, 403);
      const login = await app.inject({
        method: "POST",
        url: "/api/admin/login",
        headers,
        payload: { email: writer.email, password },
      });
      assert.equal(login.statusCode, 200);
      assert.ok(!login.body.includes(passwordHash));
      assert.match(login.headers["set-cookie"], /HttpOnly/);
      assert.match(login.headers["set-cookie"], /SameSite=Strict/);
      const cookie = login.headers["set-cookie"].split(";")[0];
      const authenticated = { ...headers, cookie };
      const session = await prisma.consultationSession.findFirstOrThrow({
        where: { staffId: writer.id },
      });
      assert.equal(session.tokenHash, tokenHash(cookie.split("=")[1]));

      const submitted = await app.inject({
        method: "POST",
        url: "/api/public/consultations",
        payload: {
          name: "Đăng ký kiểm thử quản trị",
          email: "request@example.test",
          phone: "0900000000",
          programme: "Kiến trúc",
          consent: true,
          sourcePage: "/vi/admissions",
          message: "<script>not executed</script>",
        },
      });
      assert.equal(submitted.statusCode, 201);
      const id = submitted.json().data.id;
      assert.equal(
        (await app.inject({ url: `/api/admin/consultations/${id}` }))
          .statusCode,
        401,
      );
      const list = await app.inject({
        url: "/api/admin/consultations?q=request%40example.test&status=NEW&limit=1",
        headers: authenticated,
      });
      assert.equal(list.statusCode, 200);
      assert.match(list.headers["cache-control"], /no-store/);
      assert.equal(list.json().data.total, 1);
      assert.equal(list.json().data.items[0].id, id);
      const before = (
        await app.inject({
          url: `/api/admin/consultations/${id}`,
          headers: authenticated,
        })
      ).json().data.item;
      assert.equal(before.sourcePage, "/vi/admissions");
      const update = {
        method: "PATCH",
        url: `/api/admin/consultations/${id}`,
        headers: authenticated,
        payload: {
          status: "CONTACTING",
          expectedUpdatedAt: before.updatedAt,
          note: "Đã gọi điện",
        },
      };
      assert.equal(
        (
          await app.inject({
            ...update,
            headers: { ...authenticated, origin: "https://untrusted.test" },
          })
        ).statusCode,
        403,
      );
      const viewerLogin = await app.inject({
        method: "POST",
        url: "/api/admin/login",
        headers,
        payload: { email: "viewer@example.test", password },
      });
      assert.equal(
        (
          await app.inject({
            ...update,
            headers: {
              ...headers,
              cookie: viewerLogin.headers["set-cookie"].split(";")[0],
            },
          })
        ).statusCode,
        403,
      );
      assert.equal((await app.inject(update)).statusCode, 200);
      assert.equal((await app.inject(update)).statusCode, 409);
      const after = await prisma.consultation.findUniqueOrThrow({
        where: { id },
        include: { history: true },
      });
      assert.equal(after.status, "CONTACTING");
      assert.equal(after.history.length, 2);
      assert.equal(
        after.history.find((h) => h.action === "staff_updated").metadata
          .actorId,
        writer.id,
      );
      assert.equal(
        after.history.find((h) => h.action === "staff_updated").metadata.note,
        "Đã gọi điện",
      );
      assert.equal(
        (
          await app.inject({
            ...update,
            payload: { ...update.payload, status: "INVALID" },
          })
        ).statusCode,
        400,
      );
      assert.equal(
        (
          await app.inject({
            url: "/api/admin/consultations?page=0",
            headers: authenticated,
          })
        ).statusCode,
        400,
      );
      assert.equal(
        (
          await app.inject({
            url: "/api/admin/consultations?q=no-such-person",
            headers: authenticated,
          })
        ).json().data.total,
        0,
      );
      await prisma.consultationStaff.update({
        where: { id: writer.id },
        data: { disabled: true },
      });
      assert.equal(
        (await app.inject({ url: "/api/admin/me", headers: authenticated }))
          .statusCode,
        401,
      );
      await prisma.consultationStaff.update({
        where: { id: writer.id },
        data: { disabled: false },
      });
      await prisma.consultationSession.updateMany({
        where: { staffId: writer.id },
        data: { expiresAt: new Date(0) },
      });
      assert.equal(
        (await app.inject({ url: "/api/admin/me", headers: authenticated }))
          .statusCode,
        401,
      );
      assert.equal(
        (
          await app.inject({
            method: "POST",
            url: "/api/admin/logout",
            headers: authenticated,
            payload: {},
          })
        ).statusCode,
        200,
      );
      assert.equal(
        await prisma.consultationSession.count({
          where: { staffId: writer.id },
        }),
        0,
      );
    } finally {
      await app.close();
    }
  },
);
