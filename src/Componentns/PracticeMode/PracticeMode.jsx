import { TextField } from "@mui/material";
import classes from "./index.module.css";
const PracticeMode = () => {
  return (
    <div className={classes.practiceContainer}>
      <TextField
        className={classes.practiceField}
        id="outlined-basic"
        label="Practice area"
        variant="outlined"
        multiline
        minRows={4}
        maxRows={6}
      />
    </div>
  );
};

export default PracticeMode;
