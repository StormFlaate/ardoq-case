import React from 'react';
import Container from 'react-bootstrap/Container';

function Layout({children}) {
  return (
    <Container>
            {children}
    </Container>
  );
}

export default Layout;
