# Infrastructure placeholder: proves CI, release, Oracle updater, routing and HTTPS for all
# environments before the real site exists. xs-site-build replaces this file with the site's own.
FROM nginxinc/nginx-unprivileged:1.27-alpine AS base
ARG APP_REVISION=unknown
ARG REVISION=${APP_REVISION}
ARG APP_SOURCE_URL=unknown
COPY placeholder/nginx.conf /etc/nginx/conf.d/default.conf
COPY placeholder/index.html /usr/share/nginx/html/index.html
USER root
RUN printf '{"revision":"%s"}\n' "${REVISION}" > /usr/share/nginx/html/version.json \
 && printf 'ok\n' > /usr/share/nginx/html/health \
 && chown -R 101:101 /usr/share/nginx/html
USER 101
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/health >/dev/null || exit 1

FROM base AS development

FROM base AS test
RUN nginx -t -c /etc/nginx/nginx.conf && grep -q '"revision"' /usr/share/nginx/html/version.json

FROM base AS runtime
ARG APP_REVISION=unknown
ARG REVISION=${APP_REVISION}
ARG APP_SOURCE_URL=unknown
LABEL org.opencontainers.image.revision="${REVISION}" \
      org.opencontainers.image.source="${APP_SOURCE_URL}"
