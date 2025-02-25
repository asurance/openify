import { motion } from "motion/react";
import { OpenableNormalModal, OpenableSimpleModal } from "./OpenableModal";
import { Button, message } from "antd";
const App = () => {
  return (
    <div>
      <motion.div
        className="min-h-screen flex flex-col justify-center items-center text-3xl font-bold text-blue-500"
        animate={{ scale: 3 }}
      >
        Welcome to Openify
      </motion.div>
      <Button
        onClick={async () => {
          const result = await OpenableNormalModal.open({ id: "123" });
          if (result === null) {
            message.warning("弹窗取消");
          } else {
            message.success(`弹窗关闭，拿到结果: ${result}`);
          }
        }}
      >
        打开弹窗
      </Button>
      <Button
        onClick={async () => {
          await OpenableSimpleModal.open();
          message.success("弹窗关闭");
        }}
      >
        打开弹窗2
      </Button>
      <OpenableNormalModal />
      <OpenableSimpleModal />
    </div>
  );
};

export default App;
