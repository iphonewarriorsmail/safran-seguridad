import { createClient } from '../../../utils/supabase/server'
import StockForm from '../components/StockForm'
import { notFound } from 'next/navigation'

export default async function EditStockPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: item, error } = await supabase
    .from('stock_items')
    .select('*, brands(name), categories(name)')
    .eq('id', id)
    .single()

  if (error || !item) {
    notFound()
  }

  return <StockForm item={item} />
}
