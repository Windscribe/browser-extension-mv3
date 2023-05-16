## Full QA Checklist

Note: Keep the Dev Console open in the background and watch for any console errors. Any and all Console errors must be reported as bugs.

## 0. Update checks
Update from the previous version and verify that:
- [ ] General settings are retained.
- [ ] Blocker settings are retained.
- [ ] Privacy settings are retained.
- [ ] Whitelist is retained.

## 1. Login / signup checks
- [ ] Logging in with a 2FA code works as expected.
- [ ] Revealing the password as plaintext works as expected.
- [ ] "Forgot password" takes one to the password reset page.
- [ ] "Sign up" redirects the user to relevant pages on the Windscribe website. Account creation for a free account and the upgrade page for the Pro selection.
​
​
## 2. Full Browser Shutdown & Restart
- [ ] General settings are retained.
- [ ] Connection settings are retained.
- [ ] Blocker settings are retained.
- [ ] Privacy settings are retained.
- [ ] Whitelist is retained. 
​- [ ] uBlock settings are retained.
​
## 3. Server List Updates
Server List should update when:
- [ ] Account status changes.
- [ ] loc_hash changes.
- [ ] Pro status changes.
- [ ] ALC changes.
- [ ] If new list does not contain current connect location, move up the location tree and fallback to Auto-Pilot.
​
## 4. Feature / Functionality Checks
- ### General:
- [ ] Auto-connect works.
- [ ] Notifications works.
- [ ] Location load works.
- [ ] Debug Context Menu works

- ### Connection:
- [ ] Smokewall works. - Use General > Debug Log to figure out proxy hostnames for a location. Then block said hostnames using the hosts file or using ROBERT. For example, for Hong Kong - Phooey, search for "proxy location: Hong Kong hosts:" in the Debug Log. FYI, hostname for Phooey is "hk-006.whiskergalaxy.com". :)
- [ ] Fail over works.
- [ ] Proxy port works.

- ### Blocker:
- [ ] Ad-blocker works. [Test here](https://d3ward.github.io/toolz/adblock.html) (should be around 75~)
- [ ] Block LAN works.
- [ ] Dan Pollock's Hosts File works.
- [ ] Steven Black's Hosts File works.
- [ ] uBlock settings work.
- [ ] Check for uBlock detection overlay when uBlock Lite is installed.

- ### Privacy:
- [ ] Notification Blocker (Do Not Disturb) works. Test using [HTML5 Web Notifications](https://www.bennish.net/web-notifications.html).
- [ ] WebRTC Slayer works. [Test here](https://browserleaks.com/webrtc).
- [ ] Location Warp works. [Test here](https://browserleaks.com/geo). Hard reload of the test page required.
- [ ] Time Warp works. [Test here](https://browserleaks.com/javascript).
- [ ] Language Warp works. [Test here](https://browserleaks.com/javascript).
- [ ] User Agent Rotater works. [Test here](https://browserleaks.com/javascript).
- [ ] Worker Blocker works. [Test here](https://abrahamjuliot.github.io/creepjs/).
- ### Account:
- [ ] Edit Account works.
- [ ] E-mail linking to account works.
- ### Whitelist:
- [ ] Adding to Whitelist works.
- [ ] Settings are applied to subdomains / not applied to subdomains based on the setting.
- [ ] Editing element in Whitelist works.
- [ ] Removing from Whitelist works.
- [ ] Connection Whitelist works
- [ ] Ads whitelist works
- [ ] Privacy whitelist works
​
## 5. UX Tests:
- [ ] Server list search works as expected. Test Country-level, City-level, and Location-level search. Test also for case-sensitivity.
- [ ] Alphabetical / Geographical Location toggle works.
- [ ] Expanding the bottom-most location in the server-list displays the sub-locations intuitively.
- [ ] Theme change works.
- [ ] Tutorials work as expected.
- [ ] Notification drawer works as expected.
- [ ] IP Copy (single-click) and Blur (double-click) works as expected.
- [ ] Upgrade behaviour.
- [ ] Downgrade behaviour.
- [ ] Out of Data behaviour.
- - [ ] Upon reset after out of data, new creds are fetched upon repeated auth errors.
- [ ] Browser start with proxy enabled. Have tabs open, do a restart (normal / hard), make sure one is not asked for authentication.
- [ ] Backup API works. Test with background service worker + Network tab. Make sure it fails over to another. Hostnames = api.windscribe.com, api.totallyacdn.com, api.deepstateplatypus.com
- [ ] Double Hop Detection works.
- [ ] Auto-Pilot works.
- [ ] Favorites
- - [ ] Adding locations to favorites works.
- - [ ] Removing locations from favorites works.
- - [ ] Favorites are saved between restarts.
- - [ ] Connecting to favorite location works (and IP changes).
​
## 6. Other Tests:
- [ ] DNS Leak Test. [Test here.](https://www.ipleak.net/)
- [ ] IPv6 Leak Test [Test here.](https://test-ipv6.com/)
- [ ] General UI glitches
- - [ ] View persistence.
- - [ ] Fonts.
- [ ] Extension errors
- - [ ] DevTools (background.html)
