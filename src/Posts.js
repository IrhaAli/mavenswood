import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");

  const pairedUsers = function (fetchedUsers) {
    const users = {};
    for (const user of fetchedUsers) {
      users[`${user.id}`] = user.name;
    }
    return users;
  };

  const handleChange = function (e) {
    const searchValue = e.target.value;
    setSearch(searchValue);
    setFilteredPosts(
      search.length > 0
        ? posts.filter(
            (post) =>
              post.title.includes(searchValue) ||
              post.content.includes(searchValue) ||
              post.author.includes(searchValue)
          )
        : posts
    );
  };

  useEffect(() => {
    async function loadPosts() {
      const fetchedPosts = await fetch(
        "https://ns1.youngtalentz.com/wp-json/wp/v2/posts"
      );
      const fetchedUsers = await fetch(
        "https://ns1.youngtalentz.com/wp-json/wp/v2/users"
      );
      if (!fetchedPosts.ok || !fetchedUsers.ok) {
        return;
      }
      let users = await fetchedUsers.json();
      let posts = await fetchedPosts.json();
      users = pairedUsers(users);
      posts = posts.map((post) => ({
        ...post,
        author: users[`${post.author}`],
        title: post.title.rendered,
        content: post.content.rendered,
      }));
      setPosts(posts);
      setFilteredPosts(posts);
      setSearch("");
    }

    loadPosts();
  }, []);

  return (
    <>
      <TextField
        margin="normal"
        id="search"
        label="Search by author, title or content"
        name="search"
        value={search}
        onChange={handleChange}
      />
      <Grid container spacing={2}>
        {filteredPosts.map((post, index) => (
          <Grid item xs={4} key={index}>
            <a href={post.link} target="_blank">
              <Card>
                <CardContent>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                  <Typography
                    color="body2"
                    gutterBottom
                    dangerouslySetInnerHTML={{ __html: post.author }}
                  />
                  <Typography
                    color="body2"
                    gutterBottom
                    dangerouslySetInnerHTML={{ __html: post.date }}
                  />
                  <Typography
                    variant="body2"
                    component="p"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </CardContent>
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
