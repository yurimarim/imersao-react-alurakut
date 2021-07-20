import React, { useState, useEffect } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet
} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      {/* pegar foto de perfil através do github */}
      <img
        /* template strings */
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title}({props.items.length})
      </h2>
      <ul>
        {props.items.slice(0, 6).map(currentItem => {
          return (
            <li key={currentItem.id}>
              <a href={`https://github.com/${currentItem.title}`}>
                <img src={currentItem.imageUrl} />
                <span>{currentItem.title}</span>
              </a>
            </li>
          )
        })}
        {/* passa em todos os valores do array
        {followers.map(currentItem => {
          return (
            <li key={currentItem}>
              <a href={`https://github.com/${currentItem}.png`}>
                <img src={currentItem.image} />
                <span>{currentItem.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser
  const [communities, setCommunities] = useState([])
  const favPeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]
  const [followers, setFollowers] = useState([])
  // 0 - Pegar o array de dados do github users
  // GET
  useEffect(() => {
    fetch('https://api.github.com/users/yurimarim/followers')
      .then(servidorAnswer => {
        return servidorAnswer.json()
      })
      .then(servidorCompleteAnswer => {
        setFollowers(servidorCompleteAnswer)
      })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: '1cf52f3e062a907dcfe119429bdfea',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      // --data-binary
      body: JSON.stringify({
        query: `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`
      })
    })
      .then(response => response.json()) // Pega o retorno do response.json() - recebe response como parâmetro
      .then(fullAnswer => {
        const communityDatoCms = fullAnswer.data.allCommunities
        console.log(communityDatoCms)
        setCommunities(communityDatoCms)
      })
  }, [])

  const friends = followers.map((item, i) => {
    return {
      id: i,
      title: item.login,
      imageUrl: `https://github.com/${item.login}.png`
    }
  })

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handleSubmit(e) {
                e.preventDefault()
                const dataForm = new FormData(e.target)

                console.log('Campo: ', dataForm.get('title'))
                console.log('Campo: ', dataForm.get('image'))

                const community = {
                  title: dataForm.get('title'),
                  imageUrl: dataForm.get('image'),
                  creatorSlug: githubUser
                }

                fetch('/api/communities', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(community)
                }).then(async response => {
                  const data = await response.json()
                  console.log(data.recordCreated)
                  const community = data.recordCreated
                  // spread operator - espalha o conteúdo da array communities dentro da array updated
                  const communitiesUpdated = [...communities, community]
                  setCommunities(communitiesUpdated)
                })
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBox title="Seguidores " items={friends} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({communities.length})</h2>
            <ul>
              {/* passa em todos os valores do array */}
              {communities.map(currentItem => {
                return (
                  <li key={currentItem.id}>
                    <a href={`/communities/${currentItem.id}`}>
                      <img src={currentItem.imageUrl} />
                      <span>{currentItem.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favPeople.length})
            </h2>
            <ul>
              {/* passa em todos os valores do array */}
              {favPeople.map(currentItem => {
                return (
                  <li key={currentItem}>
                    <a href={`/users/${currentItem}`}>
                      <img src={`https://github.com/${currentItem}.png`} />
                      <span>{currentItem}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          {/* <Box>Comunidades</Box> */}
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  const { isAuthenticated } = await fetch(
    'https://alurakut.vercel.app/api/auth',
    {
      headers: {
        Authorization: token
      }
    }
  ).then(response => response.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  // o nome do último parâmetro será o nome da variável
  const { githubUser } = jwt.decode(token)

  return {
    props: {
      githubUser
    } // will be passed to the page component as props
  }
}
