import { VKApi, ConsoleLogger} from 'node-vk-sdk'
import { UsersGetParams } from 'node-vk-sdk/distr/src/MethodsProps';

var req: UsersGetParams = {
    user_ids: ['1']
}
let api = new VKApi({
    token: '47e7f422872270ff03b78c2ee37ad7af3c7da055d8498b75df213ab6da1fa590371c901e807dd7a0a2a18',
    logger: new ConsoleLogger()
})

export function Auth(): void {
    api.usersGet(req)
    .then(response => {
        console.log(response)
    })
}
