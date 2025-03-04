import { Box, Typography } from '@mui/material';
interface IDetailsMean {
  title?: string;
  text?: string;
}
const DetailsMean = ({ title, text }: IDetailsMean) => {
  if (!text) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Typography> {title}: </Typography>
      <Typography>{text}</Typography>
    </Box>
  );
};

export default DetailsMean;
