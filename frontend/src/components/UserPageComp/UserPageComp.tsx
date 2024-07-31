import { LogOutButton } from "../LogOutButton/LogOutButton";
import { Divider, Stack, Title } from "@mantine/core";
import { UserDetailsForm } from "../UserDetailsForm/UserDetailsForm";

export const UserPageComp = () => {
    return (
        <Stack>
            <Title order={1}>Accounts</Title>
            <Divider />
            <UserDetailsForm />
            <Divider />
            <LogOutButton />
        </Stack>
    )
}