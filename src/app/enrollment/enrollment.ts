import { ReflectiveInjector } from '@angular/core';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

export class Enrollment {
  id: string;
  serviceProvider: any = {
    name: ''
  };
  scopes: any = {
    numberOfTaxShares: false,
    taxAddress: false,
    nonWadgeIncome: false,
    familySituation: false,
    supportPayments: false,
    deficit: false,
    housingTax: false,
    totalGrossIncome: false,
    worldIncome: false
  }
  legalBasis: any = {
    comment: null,
    attachment: null
  }
  serviceDescription: any = {
    main: null,
    deploymentDate: null,
    seasonality: null,
    maxCharge: null
  }
  agreement: boolean;
  states: string[] = [
    'application_approval',
    'deployed'
  ]
  state: string;
  newRecord: boolean;
  documents: any[] = [];
  document_types: string[] = [
    'Document::CNILVoucher',
    'Document::CertificationResults',
    'Document::FranceConnectCompliance'
  ]
  applicant: any = {
    email: null,
    position: null,
    agreement: null
  }
  errors: any;

  constructor (params) {
    if (!params) return
    for (let field in params) {
      this[field] = params[field]
    }
  }

  isStateCompleted(state) {
    return this.states.indexOf(state) <= this.states.indexOf(this.state)
  }

  serialized () {
    return snakeCaseKeys(this)
    function snakeCaseKeys (o) {
      if (!(typeof o === 'object')) return o
      const res = {}
      for (let k in o) {
        res[k.replace(/([A-Z])/g, (letter) => '_' + letter.toLowerCase())] = snakeCaseKeys(o[k])
      }
      return res
    }
  }

  cnilVoucher () {
    const res = this.documents.filter((e) => e.type == 'Document::CNILVoucher')[0]
    return res
  }
  certificationResults () {
    return this.documents.filter((e) => e.type == 'Document::CertificationResults')[0]
  }
  franceConnectCompliance () {
    return this.documents.filter((e) => e.type == 'Document::FranceConnectCompliance')[0]
  }
}