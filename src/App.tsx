import { AppProvider } from './context/AppContext'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Hero from './components/Hero'
import PatientDocument from './components/PatientDocument'
import DIWY from './components/DIWY'
import NotACourse from './components/NotACourse'
import Program from './components/Program'
import Cohorts from './components/Cohorts'
import CoachKai from './components/CoachKai'
import Clips from './components/Clips'
import ShilpaIntro from './components/ShilpaIntro'
import SymptomSelector from './components/SymptomSelector'
import Registration from './components/Registration'
import Alumni from './components/Alumni'
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
        <ShilpaIntro />
        <Clips />
        <PatientDocument />
        <DIWY />
        <NotACourse />
        <Program />
        <Cohorts />
        <CoachKai />
        <SymptomSelector />
        <Registration />
        <Alumni />
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
