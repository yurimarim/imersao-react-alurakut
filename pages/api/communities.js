import { SiteClient } from 'datocms-client'

export default async function requestReceiver(request, response) {
  if (request.method === 'POST') {
    const TOKEN = '8d7e736d943f57a77fc7f232bcf895'
    const client = new SiteClient(TOKEN)

    // Validar os dados, antes de sair cadastrando
    const recordCreated = await client.items.create({
      itemType: '975683', // model ID - "Community" criado pelo DatoCms
      ...request.body
      // title: 'Comunidade de Teste',
      // imageUrl: 'https://github.com/yurimarim.png',
      // creatorSlug: 'yurimarim'
    })

    console.log(recordCreated)

    response.json({
      data: 'Algum dado qualquer',
      recordCreated: recordCreated
    })
    return
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET - porém, no POST tem!'
  })
}
