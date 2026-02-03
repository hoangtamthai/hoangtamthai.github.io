---
tags:
  - log
  - extension
bluesky:
  handle: tamthai.de
  post_id: 3mdr763h4jk26
---

If you like me and want to see posts from [X](https://x.com) (formerly Twitter), but don't want to see it on x.com because it requires a login.
An alternative way to view content from X is to use [XCancel](https://xcancel.com/) instead.
But it's just tiring to have to edit the link from `x.com/post-id` to `xcancel.com/post-id` every time.

Luckily, there is just an extension that does exactly that: [Redirector](https://github.com/einaregilsson/Redirector)

## Usage

Set it up on your browser of choice, and the link will redirect automatically.
For example, I create a new redirect with

```
Redirect: https://x.com/*
      to: https://xcancel.com/$1
```

It is super easy to configure.
If you are facing the same problems as stated above, try this extension.

## Other redirects suggestions

Another site that I set auto-redirect is from [Medium](https://medium.com) to [Freedium](https://freedium-mirror.cfd) (a website that allows you to read any Medium blog)

```
Redirect: https://medium.com/*
      to: https://freedium-mirror.cfd/$1
```

Let me know what other redirects I should know by sending me a mail at tamthai.de@gmail.com :>
