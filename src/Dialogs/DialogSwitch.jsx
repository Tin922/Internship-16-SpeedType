import { useDialog, DIALOG } from "../Providers/DialogProvider";
import NewGameDialog from "./NewGameDialog";
import PracticeDialog from "./PracticeDialog";
import ConfirmDialog from "./ConfirmDialog";
import ResultsDialog from "../Providers/ResultsDialog";
const DialogSwitch = () => {
  const { activeDialog, close, additionalProps } = useDialog();
  return (
    <>
      <NewGameDialog
        isOpen={activeDialog === DIALOG.NEW_GAME}
        onClose={close}
        {...additionalProps}
      />
      <PracticeDialog
        isOpen={activeDialog === DIALOG.PRACTICE}
        onClose={close}
        {...additionalProps}
      />
      <ConfirmDialog
        isOpen={activeDialog === DIALOG.CONFIRM}
        onClose={close}
        {...additionalProps}
      />
      <ResultsDialog
        isOpen={activeDialog === DIALOG.RESULTS}
        onClose={close}
        {...additionalProps}
      />
    </>
  );
};

export default DialogSwitch;
