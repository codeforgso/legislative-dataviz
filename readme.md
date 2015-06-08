## Legislator Dashboard
A dashboard that allows NC residents to quickly see what their representatives and lawmakers are up to. Will show your rep and lawmaker based on lat/lon position, x current bills being worked on by either, a trend line for their current activities, and possibly more.

Produced as part of the Code for Greensboro NDoCH Hackathon.

## Building the project

- git clone this repo
- bundle install
- guard start

## Schemas
### Legislators

- @last_name="Johnson",
- @updated_at="2015-06-05 00:06:03",
- @full_name="Ralph C. Johnson",
- @first_name="Ralph C.",
- @middle_name="",
- @district="58",
- @state="nc",
- @party="Democratic",
- @email="Ralph.Johnson@ncleg.net",
- @leg_id="NCL000327",
- @active=true,
- @photo_url="http://www.ncga.state.nc.us/House/pictures/hiRes/699.jpg",
- @url="http://www.ncga.state.nc.us/gascripts/members/viewMember.pl?sChamber=House&nUserID=699", @created_at="2014-12-03 01:25:23",
- @chamber="lower",
- @offices=
  [#<Hashie::Mash address="2402 Bothwell St., Greensboro, NC 27401"
  email=nil
  fax=nil
  name="District Office"
  phone="336-988-6001"
  type="district">,
  #<Hashie::Mash address="N.C. House of Representatives\n16 W. Jones Street, Room 1317\nRaleigh, NC 27601-1096"
  email="Ralph.Johnson@ncleg.net"
  fax=nil
  name="Capitol Office"
  phone="919-733-5902"
  type="capitol">],
- @suffixes="">

## Other Fun Stuff

- http://phear.io
