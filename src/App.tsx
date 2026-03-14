import { AppProvider } from './context/AppContext'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Hero from './components/Hero'
import SymptomSelector from './components/SymptomSelector'
import ShilpaIntro from './components/ShilpaIntro'
import DocumentPreview from './components/DocumentPreview'
import RiskAssessment from './components/RiskAssessment'
import Registration from './components/Registration'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import FloatingSpotCounter from './components/FloatingSpotCounter'

function PageContent() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <SymptomSelector />
        <ShilpaIntro />
        <DocumentPreview />
        <RiskAssessment />
        <Registration />
        <FAQ />
      </main>
      <Footer />
      <FloatingSpotCounter />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <PageContent />
    </AppProvider>
  )
}
