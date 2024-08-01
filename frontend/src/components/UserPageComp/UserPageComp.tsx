import { LogOutButton } from "../LogOutButton/LogOutButton";
import { Divider, Stack, Title } from "@mantine/core";
import { UserDetailsForm } from "../UserDetailsForm/UserDetailsForm";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { ChangePassForm } from "../ChangePassForm/ChangePassForm";

export const UserPageComp = () => {
    return (
        <Stack>
            <Title order={1}>User</Title>
            <Divider />
            <UserDetailsForm />
            <Divider />
            <ChangePassForm />
            <Divider />
            <ColorSchemeToggle />
            <Divider />
            <LogOutButton />
        </Stack>
    )
}