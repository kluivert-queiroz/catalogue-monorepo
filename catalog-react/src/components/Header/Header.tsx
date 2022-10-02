import { Grid, Text } from "@mantine/core";
const Header = () => {
  return (
    <Grid>
      <Grid.Col span="auto">Catalogue Application</Grid.Col>
      <Grid.Col span="auto">
        <Text align="right">Total in cart: 1 item(s)</Text>
      </Grid.Col>
    </Grid>
  );
};

export default Header;
