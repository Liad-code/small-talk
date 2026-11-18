import { requirePaidAccess } from '@/lib/paywallGate'

export default async function StepLayout({ children }: { children: React.ReactNode }) {
  await requirePaidAccess()
  return <>{children}</>
}
