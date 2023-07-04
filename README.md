### T2K Group Website 

![T2K Group Logo](public/t2k-logo-black.webp)

### Domains:
- [t2k.group](https://t2k.group) 
- [t2k-group.co.uk](https://t2k-group.co.uk)


### Development:

#### Requirements:

- *__BLAZINGLY FAST__*
- Easy to update and maintain. automated update on commit / blog post
- Easy to add new pages (if needed)


### TODO
- [x] Add Privacy Policy
- [x] Add Terms and Conditions
- [x] add Sitemap to site
- [x] Setup a CI/CD pipeline to deploy to the site on merge to main

- [ ] Add contact form to the site and some form of endpoint to handle the data
- [ ] Add a blog post section to the site with images and text

- [ ] Setup files.t2k.group to host files such as blog post images
- [ ] make jpg to webp converter for images - python script

##### Blog:

- The blog should be easy to update and maintain
- The Blog should take a json file and convert it to a blog post
> The format should be as follows (json):
> ```json
> {
>    "title": "Blog Post Title",
>    "date": "UNIX Timestamp",
>    "author": "Author Name",
>    "image": "image.jpg",
>    "content": "This is the content"
>}
> ```
> The image should be stored in the public folder or on the files.t2k.group server and the blog should be able to be written in markdown or html

