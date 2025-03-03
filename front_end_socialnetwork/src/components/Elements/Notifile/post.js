import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Box,
} from '@mui/material';
import { Favorite, Comment } from '@mui/icons-material';

import styles from './Post.module.scss';
import clsx from 'clsx';
export default function Post() {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleComment = () => {
        setComments(comments + 1);
    };
    const [showComments, setShowComments] = useState(false);

    // Danh sách comment mẫu
    const commentspost = ['This is a great post!', 'Very informative!', 'Loved it!'];

    // Hàm xử lý sự kiện khi ấn nút Comment
    const handleShowComments = () => {
        setShowComments(!showComments);
    };
    return (
        <Card sx={{ maxWidth: 600, margin: '16px auto' }} className={clsx(styles.formsignup, 'mt-4')}>
            {/* Header với avatar và tiêu đề */}
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: 'red' }}
                        aria-label="recipe"
                        src="https://tse3.mm.bing.net/th?id=OIP.XKQRTYDnmhtXu-36EacQmAHaEK&pid=Api&P=0&h=180"
                    >
                        H
                    </Avatar>
                }
                title="Hoàng Văn A"
                subheader="October 25, 2024"
            />

            {/* Hình ảnh trong bài post */}
            <CardMedia
                component="img"
                height="300"
                image="https://tse3.mm.bing.net/th?id=OIP.XKQRTYDnmhtXu-36EacQmAHaEK&pid=Api&P=0&h=180"
                alt="Post Image"
            />

            {/* Nội dung bài đăng */}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Đây là nội dung bài đăng, có thể bao gồm text, hình ảnh hoặc video. Nội dung này sẽ giúp người xem
                    tương tác với bài viết.
                </Typography>
            </CardContent>

            {/* Các nút Like và Comment */}
            <CardActions disableSpacing>
                <IconButton aria-label="like post" onClick={handleLike}>
                    <Favorite color={likes > 0 ? 'error' : 'inherit'} />
                </IconButton>
                <Typography variant="body2">{likes} Likes</Typography>

                <IconButton aria-label="comment on post" onClick={handleComment}>
                    <Comment />
                </IconButton>
                <Typography variant="body2">{comments} Comments</Typography>
                <Button variant="contained" color="primary" onClick={handleShowComments} sx={{ mt: 2 }}>
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </Button>
                {showComments && <CommentList comments={commentspost} />}
            </CardActions>
        </Card>
    );
}
const CommentList = ({ comments }) => {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Comments</Typography>
            <List>
                {comments.map((comment, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={comment} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
