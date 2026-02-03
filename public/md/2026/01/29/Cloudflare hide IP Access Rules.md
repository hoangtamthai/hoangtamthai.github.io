---
tags:
  - blog
  - devops
  - self-hosting
bluesky:
  post_id: 3mdyjj32atk2w
  handle: tamthai.de
---

I have recently signed up for [freeshell.de](https://freeshell.de/) (a free server with shared users) and set up [Uptime-Kuma](https://uptimekuma.org/) (monitoring service).
Things were going great, all my services are green.
But when I monitored a site behind [Cloudflare tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), it got **403**!
Hmm, that's weird. I can still access the site on my browser perfectly fine, so why can't Uptime-Kuma?

## Why it got 403

I checked with `curl -I https://site-behind-cloudflare` inside the Uptime-Kuma.
It got challenged by Cloudflare bot detection.
Aha, that's the reason, I just need to add some settings to Cloudflare to allow this IP.
That's just it, right?

## The configuration is not easy...

If you have ever used Cloudflare before, you know that the site can sometimes be **confusing**.
First, I tried to search for the settings myself.
I searched "block", "filter", "ip", "security",...
It took me a while to get to the page that seemed to be the solution to my problem.
In Dashboard -> Domain -> Security -> **Security rules** is the page to configure the rule to allow certain IPs to pass through the Bot filter.

Then I created a new `Custom rule` that allows matched IP Source Address to skip the bot check.
Done.
It was not that hard.
I went back and tried fetching from Uptime-Kuma.
The problem was still there...
The config didn't have any effects.
The security events still log the request as a bot.

At some point, it was taking longer than I thought, so I turned to Gemini for help (I know by searching you can maybe get a result, but asking a LLM is just faster at this point).
It suggested adding an IP to allow in the IP Access Rules.
Ok, I searched on Cloudflare for that page.
I couldn't find it.
Searched with "IP", "Access", or "Rules" just linked to other settings.
I read a post by Cloudflare, which mentioned [IP Access Rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/), so it was definitely **not a hallucination** from the LLM.
But the problem is, where is that setting?

## The "hidden" IP Access Rules

To not waste more time searching for the setting, I asked Gemini where the page for that setting was.
Turned out you have to go to the URL `https://dash.cloudflare.com/<some-id>/<domain>/security/security-rules/ip-access-rules`.
When I went there, a new page appeared.
Then I created a rule here to allow the IP of my freeshell server to bypass bot detection.
After I created the rule there, it showed up on the Security rules page.
Now it finally worked.
The status is green, and I'm happy :>

## Why this is even a problem

Even though Cloudflare said in their docs that you should use `Custom rules`, it doesn't work the way they said.
I checked the traffic sequence, and it does say that `Web Application Rules` (where the `Custom rules` are activated) run before the bot mitigation.
In my case, the rule does not apply, and I still get blocked by bot detection first.
If someone knows more about this, I'm happy to hear.

I believe the main problem is because of the rather new dashboard that Cloudflare is pushing.
While updating and making things more modern, fast, and easy to use are great values to have, it is always good to make things that don't break.
Cloudflare is indeed a very big system, so small things like this
is inevitable.

I'm not a big fan of LLM and AI, but I still usually use them to help me with daily trouble.
For today's story, without its assistance, I don't know how long it would take me to actually complete my goal.
I hope that by writing this blog, I can help someone in the future and maybe give you some helpful insights.

Thanks for reading, and if you have any suggestions, please send them to me by email tamthai.de@gmail.com or leave comments below.
