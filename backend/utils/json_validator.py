def is_valid_postmortem(data: dict) -> bool:
    if not isinstance(data, dict):
        return False

    return (
        isinstance(data.get("summary"), str)
        and isinstance(data.get("impact"), str)
        and isinstance(data.get("timeline"), list)
        and isinstance(data.get("root_cause"), str)
        and isinstance(data.get("action_items"), list)
    )
