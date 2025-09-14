import React, { createContext, useState } from 'react';

interface ListContextType {
  callToActionSwitch: boolean;
  setCallToActionSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  ticketCallToActionSwitch: boolean;
  setTicketCallToActionSwitch: React.Dispatch<React.SetStateAction<boolean>>;

}

const ListContext = createContext<ListContextType | null>(null);

const EventContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [callToActionSwitch, setCallToActionSwitch] = useState<boolean>(false);
  const [ticketCallToActionSwitch, setTicketCallToActionSwitch] = useState<boolean>(false);

  return (
    <ListContext.Provider value={{ callToActionSwitch, setCallToActionSwitch, ticketCallToActionSwitch, setTicketCallToActionSwitch }}>
      {children}
    </ListContext.Provider>
  );
};

export { EventContextProvider, ListContext };
