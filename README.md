# mylr [My Living Room] -> mylr -> (rhymes with "Tyler")

# read this file as raw.  

Building a message board over here.  It's hard to make friends in mn, and the way I finally did it was on a local record label message board.  That thing was the victim of a series of hacking attacks that effectively obsoleted it.  It was replaced with a newer architecture board that had too many images and was just slow as shit to load.  Then everybody moved to facebook, which has sort of stopped being funny and started being sort of orwellian.

Anyway, I owe you one, messageboard god.

###Core features:
####Security
    token based authentication w/ SMS to verify new accounts
    duh - the client never throws SQL at the server
      carefully curated data interface implemented as web service
    active DDOS detection / mitigaton
    scraping the site is considered DDOS
    no login needed to read.  Fuck, this might not actually be compatible with above requirements.
    Open questions: How do we make it mathematically impossible to dump this thing out for the cops to read?
      ...Maybe that type of party is too spicy anyway
####Text
    This website does not host or serve images.
    This website loads instantaneously.
    The website jumps to the start of new posts since you last read the thread.
      Active threads should probably live in server side memory
    Users can post links to offsite images/gifs which render inline
    LATER: the page should not even render the images unless they are actually in the browser window
      Sooner: option for click to render, apply this to posts you've already read
####In app private messaging
####Mod tools for banning
    users
    posts
    threads
    offsite content
####Monetization - on an automated basis
    a software agent posts on the board, politely begging users to buy things from our amazon affiliates
      (there will be a thread about the InstantPot, I goddamn guarantee you)
    identify users who are hopelessly addicted to the website and occasionally shake them down for five dollars
      correction: *repeatedly shake them down for five dollars*
####Convincing javascript => employment writing code somewhere other than a suburban office park
  

###Were this to turn into a product 
  (ie build your own virtual living room) we'd want more privacy options.
  People might actually want to do this.  Why would you not want your own private gated social community?
  This is not an original thought.  Venture capital has most assuredly been wasted on this idea already.
  The secret to having a good message board is 
    interesting people
    good moderation
 

Arch notes.
    Node.js
    MongoDB
    Solr
    jQuery, Backbone
    AWS
    Github

  
