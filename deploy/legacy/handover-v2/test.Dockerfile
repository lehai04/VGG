FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends nginx openssl ca-certificates systemd libstdc++6 libatomic1 curl unzip && rm -rf /var/lib/apt/lists/*
COPY test-start.sh /test-start.sh
ENTRYPOINT ["bash", "/test-start.sh"]
