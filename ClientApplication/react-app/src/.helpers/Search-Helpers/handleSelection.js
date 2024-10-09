
export const handleSelection = (options, event, responseMethod) => {
    const selectedTitle = event.target.value;
        const selected = options.find(
            (option) => option.props.value === selectedTitle
        );

        if (selected) {
            responseMethod(selected.key);
        }
}