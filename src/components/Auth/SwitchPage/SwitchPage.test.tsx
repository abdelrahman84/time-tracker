import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";

import SwitchPage from "./SwitchPage";
import { MemoryRouter, Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";


test('SwitchPage should render correctly', async () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    const title = 'Switch page';
    const linkTitle = 'link title';
    const linkUrl = '/register';

    render(
        <Router location={history.location} navigator={history}>
            <SwitchPage title={title} linkTitle={linkTitle} linkUrl={linkUrl} />
        </Router>
    )

    await userEvent.click(screen.getByText(/link title/i));
    expect(history.push).toHaveBeenCalledWith(
        {
            hash: '',
            pathname: '/register',
            search: '',
        },
        undefined,
        {
            preventScrollReset: undefined,
            relative: undefined,
            replace: false,
            state: undefined
        }
    );
})