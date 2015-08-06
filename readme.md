## Legislator Dashboard
A dashboard that allows NC residents to quickly see who their representatives are and what they are up to. Visual representations of the relationships between representatives, subjects, and campaign finance will be built in. Future versions will include biographical information about the representatives, info about each elected position and a guide / path to running for different positions at the local and state level.

Produced as part of the Code for Greensboro NDoCH Hackathon.

## Building the project

- `git clone` this repo
- `bundle install`
- `figaro install` to create `config/application.yml`
- You'll need an api key for the [Open State API](https://sunlightlabs.github.io/openstates-api/). Once you have it, place it into `config/application.yml` as `SUNLIGHT_API_KEY:"your_key_goes_here"`
- `rake db:create`
- `guard start`
- Join #legislative-dataviz on [the CfG Slack](http://slack.codeforgreensboro.org), create a branch for your additions, submit pull requests, and accept nothing less than total victory in all things

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
- @offices=[...],
- @suffixes=""

## Other Fun Stuff/Notes

- http://phear.io
- https://sunlightlabs.github.io/openstates-api/ [Legislative Data]
- http://data.influenceexplorer.com/api [Campaign Finance Data]
- https://open-nc.org/catalog/
