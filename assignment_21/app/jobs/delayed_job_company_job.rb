class DelayedJobCompanyJob < ApplicationJob
  queue_as :default

  def perform(company_id)
    company = Company.find_by(id: company_id)
    company.destroy if company.present?
  end
end
