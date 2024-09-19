import React from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box, Stack } from '@mui/material';

export default function DetailsPage() {
  return (
    <Container maxWidth="lg" sx={{
      display:'flex',
      marginTop:"60px",
      marginBottom:"60px",
      

    }}>
      <Stack direction={{ xs: 'column', lg: 'row' }}   >
        <Grid item xlgs={6} md={6} >
          <Card >
            <CardMedia
              component="img"
              alt="Descriptive Image"
              height="100%"
              
              image="https://img.freepik.com/free-psd/language-template-design_23-2150651239.jpg?w=996&t=st=1726126432~exp=1726127032~hmac=f9746cdca41341bb0f2b11ad01c47d38542aec74625e8acac56f372d02f960ca"
              style={{ objectFit: 'cover', height: '100%' }}
            />
          </Card>
        </Grid>
        <Grid item xs={6} md={6} style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
          <Box >
            <Typography variant="h4" gutterBottom>
              LEARN WHAT U WANT
            </Typography>
            <Typography variant="body1"  color="textSecondary">
            Discover the Joy of Learning a New Language

Embark on a journey of language learning with our platform, designed to connect you with native speakers and language enthusiasts around the world. Whether you're a beginner or looking to refine your skills, our community offers a rich, interactive environment for practice and growth.





  </Typography>
          </Box>
        </Grid>
      </Stack>
    </Container>
  );
}
