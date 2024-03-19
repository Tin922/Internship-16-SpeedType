import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const PracticeDialog = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const handleConfirmPractice = (option) => {
    if (option === "yes") {
      onClose();

      navigate(`/practice`);
    } else onClose();
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Are you sure you want to practice?</DialogTitle>
      <DialogActions>
        <Button onClick={() => handleConfirmPractice("yes")}>Yes</Button>
        <Button onClick={() => handleConfirmPractice("no")}>No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PracticeDialog;
