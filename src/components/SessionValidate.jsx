import SweetAlert from '@common/SweetAlert';
import { useAuth } from '@hooks/useAuth';

export default function SessionValidate() {

    const auth = useAuth();

    const validate = async () => {

        const response = await auth.validateSession()
        if (!response) {
            console.log('noooo')
            const options = {
                icon: 'error',
                title: 'Sesión finalizada',
                text: 'Inicie sessón para continuar!',
            };
            SweetAlert(options)
                ?.then(() => {
                    auth.logOut();
                })
        }
        // .then((response) => {
        //     console.log(response)

        // })
        // .catch((err) => {
        //     console.log(err);
        // })
    }

    validate();

}