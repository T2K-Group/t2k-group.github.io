### T2K Group Website 

![T2K Group Logo](public/t2k-logo-black.png)

### Domains:
- [t2k.group](https://t2k.group) 
- [t2k-group.co.uk](https://t2k-group.co.uk)


### Development:

#### Requirements:

The site has a few main requirements and this should be held throughout the design
- The site should be fast and responsive > its 2023 no one likes a slow site
- The site should be easy to maintain > no one likes a site that is hard to update. blogs should be easy to add and edit (json / markdown)
- Site should be professional > This is the face of the company, it should be clean and professional

#### Design:

- The site should be clean and professional
- The colour scheme should follow this pallet: ![T2K Colours](<design/site pallette.png>)

Colors: #171717, #001D3D, #003566, #FFC300, #F0EDEE


#### Blog:

- The blog should be easy to update and maintain
- uses JSON files to store blog posts
- gets data from https://t2k.group/json/blog_posts.json


TODO
- [x] Add Privacy Policy
- [x] Add Terms and Conditions

- [ ] Add a blog post section to the site with images and text
- [ ] Add contact form to the site
- [ ] Fix contact form and add endpoint
- [ ] Setup a CI/CD pipeline to deploy to the site on merge to master
- [ ] Setup files.t2k.group to host files such as blog post images
- [ ] make jpg to webp converter for images - python script
