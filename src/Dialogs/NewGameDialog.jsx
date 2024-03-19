import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import { Button } from "@mui/material";
const NewGameDialog = ({
  isOpen,
  onClose,
  handleSubmitRegular,
  handleSubmitInstantDeath,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Which game mode you want to play?</DialogTitle>
      <DialogActions>
        <Button onClick={handleSubmitRegular}>Regular Mode</Button>
        <Button onClick={handleSubmitInstantDeath}>Instant Death Mode</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGameDialog;
