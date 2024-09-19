import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              We are a company committed to providing the best services. Our team is dedicated to ensuring customer satisfaction.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">
                Home
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                About
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Services
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Contact
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: leran exchange@example.com
              <br />
              Phone: 7994126039
              <br />
              Address: 123 Main St, City, Country
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}

