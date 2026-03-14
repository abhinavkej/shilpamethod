import { motion, AnimatePresence } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import AgeGate from './components/AgeGate'
import Contextualization from './components/Contextualization'
import SymptomSelector from './components/SymptomSelector'
import ShilpaIntro from './components/ShilpaIntro'
import DocumentPreview from './components/DocumentPreview'
import RiskAssessment from './components/RiskAssessment'
import Registration from './components/Registration'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import FloatingSpotCounter from './components/FloatingSpotCounter'

function PageContent() {
  const { state } = useApp()

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <div id="age-gate-section">
          <AnimatePresence mode="wait">
            {!state.ageGateCompleted && <AgeGate />}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {state.ageGateCompleted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Contextualization />
              <SymptomSelector />
              <ShilpaIntro />
              <DocumentPreview />
              <RiskAssessment />
              <Registration />
              <FAQ />
            </motion.div>
          )}
        </AnimatePresence>
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
