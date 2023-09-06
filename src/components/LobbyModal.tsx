import { Button, Modal, Stack, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export function LobbyModal() {
  const [menuOpen, { open, close }] = useDisclosure(true);
  const [lobbyOpen, setLobbyOpen] = useState(false);
  return (
    <Modal opened={menuOpen} onClose={close} size="auto">
      <Stack>
        <Title>Codenames</Title>
        <TextInput></TextInput>
        <Button
          onClick={() => {
            setLobbyOpen(true);
            console.log(lobbyOpen);
          }}
        ></Button>
        {lobbyOpen ? <div>Hey</div> : <div></div>}
      </Stack>
    </Modal>
  );
}
