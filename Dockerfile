FROM node:lts

# See https://crbug.com/795759
# Install latest chrome dev package, which installs the necessary libs to
# make the bundled version of Chromium that Puppeteer installs work.
RUN  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update && apt-get install -yq libgconf-2-4 xvfb libgles2-mesa google-chrome-stable --no-install-recommends

ENV DISPLAY :99