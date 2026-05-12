import { createClient } from '../../../utils/supabase/server'
import CalculatorForm from '../components/CalculatorForm'
import { notFound } from 'next/navigation'

export default async function EditCalculatorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: item, error } = await supabase.from('calculator_items').select('*').eq('id', id).single()

  if (error || !item) {
    notFound()
  }

  return <CalculatorForm item={item} />
}
