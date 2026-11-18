import { requirePaidAccess } from '@/lib/paywallGate'
import { hasStep7Access } from '@/lib/step7Gate'
import { Step7Lock } from '@/components/step7/Step7Lock'

export const dynamic = 'force-dynamic' // the gate depends on the request's cookie

export default async function StepLayout({ children }: { children: React.ReactNode }) {
  await requirePaidAccess()
  // Temporary review password (see src/lib/step7Gate.ts)
  if (!(await hasStep7Access())) return <Step7Lock />
  return <>{children}</>
}
