import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";

export default function Posts({ posts }) {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

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

  return (
    <div>
      <div className="search-bar">
        <TextField
          margin="normal"
          id="search"
          label="Search by author, title or content"
          name="search"
          value={search}
          onChange={handleChange}
        />
      </div>
      <Grid container spacing={2}>
        {filteredPosts.map((post, index) => (
          <Grid item xs={4} key={index}>
            <a href={post.link} target="_blank">
              <Card>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="https://source.unsplash.com/random"
                />
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
                    dangerouslySetInnerHTML={{
                      __html: `${post.content.substring(0, 50)}...`,
                    }}
                  />
                </CardContent>
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
