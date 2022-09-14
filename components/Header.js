import { useRef, useState } from 'react';
import Link from 'next/link'
import { Navbar, Text } from "@nextui-org/react";
import { useI18N } from 'context/i18n';
import { useRouter } from 'next/router';

export function Header() {
  const [results, setResults] = useState([])
  const searchRef = useRef()
  const { locale, locales } = useRouter()
  const { t } = useI18N()

  const getValue = () => searchRef.current?.value

  const handleChange = (e) => {
    const q = getValue()
    if(!q) return

    fetch(`/api/search?q=${q}`)
      .then(res => res.json())
      .then(serachResults => {
        setResults(serachResults)
      })
  }

  const restOfLocales = locales.filter(l => l !== locale)

  return (
      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">xkcd App</Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Link href='/'>
            <Navbar.Link>{t('HOME_HEADER')}</Navbar.Link>
          </Link>

          <Link href='/' locale={restOfLocales[0]}>
            <Navbar.Link>{restOfLocales[0]}</Navbar.Link>
          </Link>

          <input ref={searchRef} type="search" onChange={handleChange}/>
          {
            Boolean(results.length) && <div>
              <ul>
                <li key="all-search">
                  <Link href={`/search?q=${getValue()}`}>
                    <a>{t('SEARCH_RESULT_HEADER', results.length)}</a>
                  </Link>
                </li>
                {
                  results.map(result => (
                    <li key={result.id}>
                      <Link href={`/comic/${result.id}`}>
                        <a>{result.title}</a>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          }
        </Navbar.Content>
      </Navbar>  
  )
}
