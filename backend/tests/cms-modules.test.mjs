import test from "node:test";
import assert from "node:assert/strict";
test(
  "restored CMS: permissions, content lifecycle, conflicts, history and dashboard",
  { skip: !process.env.ADMIN_TEST_DATABASE_URL },
  async () => {
    process.env.DATABASE_URL = process.env.ADMIN_TEST_DATABASE_URL;
    process.env.NODE_ENV = "test";
    process.env.CMS_APP_URL = "http://localhost:3001";
    process.env.PUBLIC_APP_URL = "http://localhost:3000";
    process.env.STORAGE_ACCESS_KEY="cms-test";
    process.env.STORAGE_SECRET_KEY="cms-test-secret";
    const { mediaStorage }=await import("../dist/shared/storage/minio.js");
    const removed=[];
    mediaStorage.removeObject=async(_bucket,key)=>{removed.push(key);};
    const { buildApp } = await import("../dist/app.js");
    const { prisma } = await import("../dist/shared/database/prisma.js");
    const { hashPassword } =
      await import("../dist/modules/consultation-admin/password.js");
    const app = await buildApp();
    const base = { origin: process.env.CMS_APP_URL, "x-vgg-admin": "1" };
    const password = "Cms-test-password-123!";
    try {
      const passwordHash = await hashPassword(password);
      const admin = await prisma.consultationStaff.create({
        data: {
          email: "cms-admin@example.test",
          fullName: "CMS admin",
          passwordHash,
          canManageContent: true,
        },
      });
      const viewer = await prisma.consultationStaff.create({
        data: {
          email: "cms-reader@example.test",
          fullName: "Reader",
          passwordHash,
          canUpdate: false,
        },
      });
      async function login(email) {
        const r = await app.inject({
          method: "POST",
          url: "/api/admin/login",
          headers: base,
          payload: { email, password },
        });
        assert.equal(r.statusCode, 200, r.body);
        return { ...base, cookie: r.headers["set-cookie"].split(";")[0] };
      }
      const headers = await login(admin.email),
        read = await login(viewer.email);
      async function call(method, path, payload, h = headers) {
        return app.inject({
          method,
          url: "/api/admin/" + path,
          headers: h,
          ...(payload ? { payload } : {}),
        });
      }
      assert.equal(
        (await app.inject({ url: "/api/admin/dashboard" })).statusCode,
        401,
      );
      for (const path of ["news", "resources", "resource-categories"])
        assert.equal((await call("GET", path, null, read)).statusCode, 403);
      assert.equal(
        (
          await call(
            "POST",
            "resource-categories",
            { name: "No CSRF" },
            { cookie: headers.cookie },
          )
        ).statusCode,
        403,
      );
      const input = {
        title: "CMS integration article",
        slug: "cms-integration-article",
        locale: "vi",
        category: "ADMISSIONS",
        authorName: "CMS admin",
        excerpt: "Integration test description",
        content:
          '<p>Long enough content for integration test.</p><script>alert(1)</script><img src="x" onerror="alert(1)">',
        status: "PUBLISHED",
        publishedAt: "2026-01-01",
      };
      let r = await call("POST", "news", input);
      assert.equal(r.statusCode, 201, r.body);
      let post = r.json().data.post;
      assert.ok(!post.content.includes("<script"));
      assert.ok(!post.content.includes("onerror"));
      r = await call("PUT", "news/" + post.id, {
        ...input,
        title: "Changed article",
        revision: post.updatedAt,
      });
      assert.equal(r.statusCode, 200, r.body);
      assert.equal(
        (
          await call("PUT", "news/" + post.id, {
            ...input,
            revision: post.updatedAt,
          })
        ).statusCode,
        409,
      );
      r = await call("POST", "resource-categories", {
        name: "CMS test category",
      });
      assert.equal(r.statusCode, 200, r.body);
      const category = r.json().data.category;
      const resource = {
        title: "CMS PDF test",
        locale: "vi",
        status: "PUBLISHED",
        categoryId: category.id,
        resourceType: "PDF_DOCUMENT",
        documentType: null,
        documentNumber: null,
        issueDate: null,
        issuingOrganization: null,
        fileName: "test.pdf",
        fileUrl: "/api/media/cms/resources/test.pdf",
        fileType: "application/pdf",
        fileSize: 100,
      };
      r = await call("POST", "resources", resource);
      assert.equal(r.statusCode, 201, r.body);
      let file = r.json().data.resource;
      r = await call("PUT", "resources/" + file.id, {
        ...resource,
        title: "Updated resource",
        revision: file.updatedAt,
      });
      assert.equal(r.statusCode, 200, r.body);
      const current = r.json().data.resource;
      assert.equal(
        (
          await call("PUT", "resources/" + file.id, {
            ...resource,
            revision: file.updatedAt,
          })
        ).statusCode,
        409,
      );
      assert.equal(
        (await call("GET", "resources/" + file.id + "/versions")).json().data
          .total,
        2,
      );
      const consultation = await prisma.consultation.create({
        data: {
          fullName: "CMS consult test",
          email: "cms-consult@example.test",
          phone: "0900000001",
        },
      });
      const update = {
        revision: consultation.updatedAt.toISOString(),
        status: "CONTACTING",
        assignedAdminId: admin.id,
        note: "Follow-up test",
        followUp: {
          outcome: "INTERESTED",
          nextContactAt: new Date().toISOString(),
        },
      };
      assert.equal(
        (
          await call(
            "PATCH",
            "consultation-workspace/" + consultation.id,
            update,
            read,
          )
        ).statusCode,
        403,
      );
      r = await call(
        "PATCH",
        "consultation-workspace/" + consultation.id,
        update,
      );
      assert.equal(r.statusCode, 200, r.body);
      assert.equal(
        r.json().data.consultation.notes[0].content,
        "Follow-up test",
      );
      assert.equal(
        (
          await call(
            "PATCH",
            "consultation-workspace/" + consultation.id,
            update,
          )
        ).statusCode,
        409,
      );
      r = await call("GET", "dashboard");
      assert.equal(r.statusCode, 200, r.body);
      assert.ok(r.json().data.totals.publishedContent >= 2);
      assert.equal(
        (
          await call(
            "DELETE",
            "resources/" +
              file.id +
              "?revision=" +
              encodeURIComponent(current.updatedAt),
          )
        ).statusCode,
        200,
      );
      assert.ok(removed.includes("cms/resources/test.pdf"));
      assert.equal(await prisma.resourceFile.count({where:{id:file.id}}),0);
      assert.equal(await prisma.cmsRevision.count({where:{entityType:"resource",entityId:file.id}}),0);
      const sharedInput={...resource,fileUrl:"/api/media/cms/resources/shared.pdf"};
      const a=(await call("POST","resources",sharedInput)).json().data.resource;
      const b=(await call("POST","resources",sharedInput)).json().data.resource;
      r=await call("DELETE",`resources/${a.id}?revision=${encodeURIComponent(a.updatedAt)}`);
      assert.equal(r.statusCode,200,r.body);assert.equal(r.json().data.retained,1);
      assert.ok(!removed.includes("cms/resources/shared.pdf"));
      r=await call("DELETE",`resources/${b.id}?revision=${encodeURIComponent(b.updatedAt)}`);
      assert.equal(r.statusCode,200,r.body);assert.ok(removed.includes("cms/resources/shared.pdf"));
      const pending=(await call("POST","resources",{...resource,fileUrl:"/api/media/cms/resources/retry.pdf"})).json().data.resource;
      mediaStorage.removeObject=async()=>{throw Error("Simulated storage outage");};
      r=await call("DELETE",`resources/${pending.id}?revision=${encodeURIComponent(pending.updatedAt)}`);
      assert.equal(r.statusCode,202);assert.equal(r.json().data.pending,true);
      assert.equal(await prisma.resourceFile.count({where:{id:pending.id}}),0);
      mediaStorage.removeObject=async(_bucket,key)=>{removed.push(key);};
      const {retryResourceCleanup}=await import("../dist/modules/cms/resource-deletion.js");
      await retryResourceCleanup();assert.ok(removed.includes("cms/resources/retry.pdf"));
      assert.equal(await prisma.cmsRevision.count({where:{entityType:"resource_deletion",action:"pending"}}),0);
      assert.equal(
        (await call("DELETE", "resource-categories/" + category.id)).statusCode,
        200,
      );
      assert.equal((await call("DELETE", "news/" + post.id)).statusCode, 200);
    } finally {
      await app.close();
      await prisma.$disconnect();
    }
  },
);
