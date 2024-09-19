// Validation function
export const validator = (() => {
    return {
        validate: (update, player, roster) => {
            const newErrors = {}

            const updateOrCreatedPlayer = update ? updatedPlayer : player

            // Check if first_name and last_name contain only alphabetic characters
            const nameRegex = /^[A-Za-z\s]+$/

            if (!nameRegex.test(updateOrCreatedPlayer?.first_name)) {
                newErrors.first_name =
                    'First name should only contain letters and spaces.'
            }

            if (!nameRegex.test(updateOrCreatedPlayer?.last_name)) {
                newErrors.last_name =
                    'Last name should only contain letters and spaces.'
            }

            // Check for duplicate first_name + last_name
            const duplicateName = roster?.find(
                (p) =>
                    p.first_name === updateOrCreatedPlayer?.first_name &&
                    p.last_name === updateOrCreatedPlayer?.last_name,
            )
            if (duplicateName) {
                newErrors.name = 'This name already exists in the roster.'
            }

            // Check for duplicate number
            if (
                updateOrCreatedPlayer?.number < 1 ||
                updateOrCreatedPlayer?.number > 99
            ) {
                newErrors.number = 'Number must be between 1 and 99.'
            } else if (
                roster?.find((p) => p.number === updateOrCreatedPlayer?.number)
            ) {
                newErrors.number = 'This number is already taken.'
            }

            // Position-based number validation
            if (updateOrCreatedPlayer?.position) {
                if (
                    ['Quarterback', 'Running Back'].includes(
                        updateOrCreatedPlayer?.position,
                    ) &&
                    updateOrCreatedPlayer?.number > 49
                ) {
                    newErrors.number =
                        'Skill positions can only have numbers 1-49.'
                } else if (
                    ['Offensive Lineman'].includes(
                        updateOrCreatedPlayer?.position,
                    ) &&
                    (updateOrCreatedPlayer?.number < 50 ||
                        updateOrCreatedPlayer?.number > 99)
                ) {
                    newErrors.number = 'Lineman must have numbers 50-99.'
                }
            }

            return newErrors
        },
    }
})()
