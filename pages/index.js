import React, { useState, useEffect } from 'react'
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

export default function Home() {
  const githubUser = 'yurimarim'
  const [communities, setCommunities] = useState([
    {
      id: '12312312098381209389012809312809809312',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    }
  ])
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
  useEffect(() => {
    fetch('https://api.github.com/users/yurimarim/followers')
      .then(servidorAnswer => {
        return servidorAnswer.json()
      })
      .then(servidorCompleteAnswer => {
        setFollowers(servidorCompleteAnswer)
      })
  }, [])

  // 1 - Criar um box que vai ter um map, baseado nos items do array
  // que pegamos do GitHub

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
                  id: new Date().toISOString,
                  title: dataForm.get('title'),
                  image: dataForm.get('image')
                }
                // spread operator - espalha o conteúdo da array communities dentro da array updated
                const communitiesUpdated = [...communities, community]
                setCommunities(communitiesUpdated)
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
          <ProfileRelationsBox title="Seguidores " items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({communities.length})</h2>
            <ul>
              {/* passa em todos os valores do array */}
              {communities.map(currentItem => {
                return (
                  <li key={currentItem.id}>
                    <a href={`/users/${currentItem.title}`}>
                      <img src={currentItem.image} />
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
