import React, { createContext, useContext, useState } from "react";
import EditorSettingsModal from "@/components/modals/EditorSettingsModal";

interface Context {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<Context>({
  showModal: false,
  setShowModal: () => null,
});

export function useModal() {
  return useContext(ModalContext);
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState(false);

  const value = {
    showModal,
    setShowModal,
  };

  print();

  return (
    <ModalContext.Provider value={value}>
      {children}
      {showModal && <EditorSettingsModal />}
    </ModalContext.Provider>
  );
};

// :)
function print() {
  console.log(
    `
     ___           ___           ___           ___                    ___           ___           ___                    ___           ___           ___           ___     
    /\\__\\         /\\  \\         /\\  \\         /\\__\\                  /\\__\\         /\\  \\         /\\  \\                  /\\__\\         /\\  \\         /\\  \\         /\\  \\    
   /::|  |       /::\\  \\        \\:\\  \\       /:/  /                 /:/ _/_       /::\\  \\       /::\\  \\                /:/  /        /::\\  \\       /::\\  \\       /::\\  \\   
  /:|:|  |      /:/\\:\\  \\        \\:\\  \\     /:/  /                 /:/ /\\__\\     /:/\\:\\  \\     /:/\\ \\  \\              /:/__/        /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\  
 /:/|:|__|__   /::\\~\\:\\  \\       /::\\  \\   /:/  /  ___            /:/ /:/ _/_   /::\\~\\:\\  \\   _\\:\\~\\ \\  \\            /::\\  \\ ___   /::\\~\\:\\  \\   /::\\~\\:\\  \\   /::\\~\\:\\  \\ 
/:/ |::::\\__\\ /:/\\:\\ \\:\\__\\     /:/\\:\\__\\ /:/__/  /\\__\\          /:/_/:/ /\\__\\ /:/\\:\\ \\:\\__\\ /\\ \\:\\ \\ \\__\\          /:/\\:\\  /\\__\\ /:/\\:\\ \\:\\__\\ /:/\\:\\ \\:\\__\\ /:/\\:\\ \\:\\__\\
\\/__/~~/:/  / \\/__\\:\\/:/  /    /:/  \\/__/ \\:\\  \\ /:/  /          \\:\\/:/ /:/  / \\/__\\:\\/:/  / \\:\\ \\:\\ \\/__/          \\/__\\:\\/:/  / \\:\\~\\:\\ \\/__/ \\/_|::\\/:/  / \\:\\~\\:\\ \\/__/
      /:/  /       \\::/  /    /:/  /       \\:\\  /:/  /            \\::/_/:/  /       \\::/  /   \\:\\ \\:\\__\\                 \\::/  /   \\:\\ \\:\\__\\      |:|::/  /   \\:\\ \\:\\__\\  
     /:/  /        /:/  /     \\/__/         \\:\\/:/  /              \\:\\/:/  /        /:/  /     \\:\\/:/  /                 /:/  /     \\:\\ \\/__/      |:|\\/__/     \\:\\ \\/__/  
    /:/  /        /:/  /                     \\::/  /                \\::/  /        /:/  /       \\::/  /                 /:/  /       \\:\\__\\        |:|  |        \\:\\__\\    
    \\/__/         \\/__/                       \\/__/                  \\/__/         \\/__/         \\/__/                  \\/__/         \\/__/         \\|__|         \\/__/    
`
  );
}
