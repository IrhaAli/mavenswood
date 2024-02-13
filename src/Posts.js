import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const pairedUsers = function (fetchedUsers) {
    console.log(fetchedUsers);
    const users = {};
    for (const user of fetchedUsers) {
      users[`${user.id}`] = user.name;
    }
    return users;
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
      }));
      setPosts(posts);
    }

    loadPosts();
  }, []);

  return (
    <Grid container spacing={2}>
      {posts.map((post, index) => (
        <Grid item xs={4} key={index}>
          <a href={post.link} target="_blank">
            <Card>
              <CardContent>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
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
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
              </CardContent>
            </Card>
          </a>
        </Grid>
      ))}
    </Grid>
  );
}
