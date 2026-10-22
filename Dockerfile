FROM node:22

ARG GECKODRIVER_VERSION=0.37.1
ARG EDGE_VERSION=155.0.4283.62-1

# See https://crbug.com/795759
# Install latest chrome dev package, which installs the necessary libs to
# make the bundled version of Chromium that Puppeteer installs work.
#
# firefox-esr comes from Debian apt (signed packages).
# geckodriver 0.37.1 is pinned from GitHub over HTTPS. Mozilla GPG is not used:
# that release was signed with subkey 09BEED63F3462A2DFFAB3B875ECB6497C1A20256,
# which Mozilla revoked on 2026-08-10. Importing the current Mozilla key makes
# `gpg --verify` fail closed. Re-enable GPG when Mozilla ships a build signed
# with 827E658608679618CD349F93678E455D76767AA3.
# https://blog.mozilla.org/security/2026/08/10/updated-gpg-key-for-signing-firefox-and-thunderbird-releases/
RUN  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -yq libgconf-2-4 xvfb libgles2-mesa google-chrome-stable firefox-esr ca-certificates --no-install-recommends \
     && wget -q "https://github.com/mozilla/geckodriver/releases/download/v${GECKODRIVER_VERSION}/geckodriver-v${GECKODRIVER_VERSION}-linux64.tar.gz" -O /tmp/geckodriver.tar.gz \
     && tar -xzf /tmp/geckodriver.tar.gz -C /usr/local/bin \
     && chmod +x /usr/local/bin/geckodriver \
     && rm /tmp/geckodriver.tar.gz \
     && rm -rf /var/lib/apt/lists/*

# Microsoft Edge for the test:edge job.
# Version is pinned. Apt checks the package against the signed repo index.
# The signing key must match BC528686B50D79E339D3721CEB3E94ADBE1229CF
# (https://packages.microsoft.com/keys/microsoft.asc).
RUN  apt-get update \
     && apt-get install -y gnupg ca-certificates \
     && mkdir -p /usr/share/keyrings \
     && wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /usr/share/keyrings/microsoft-edge.gpg \
     && gpg --show-keys --with-colons /usr/share/keyrings/microsoft-edge.gpg | grep -q 'BC528686B50D79E339D3721CEB3E94ADBE1229CF' \
     && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft-edge.gpg] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge.list \
     && apt-get update \
     && apt-get install -y microsoft-edge-stable=${EDGE_VERSION} \
     && rm -rf /var/lib/apt/lists/*

ENV DISPLAY :99
