import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConfirmDialog = ({ isOpen, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const navgiateToHomePage = () => {
    navigate("/");
    onClose();
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Would you like to proceed to the next level?</DialogTitle>
      <DialogActions>
        <Button onClick={onSubmit}>Yes</Button>
        <Button onClick={navgiateToHomePage}>No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
