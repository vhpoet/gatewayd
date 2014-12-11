module.exports = {
  errors: {
    insufficient_funds: {
      success: false,
      error_type: 'transaction',
      error: 'terINSUF_FEE_B'
    },
    connection: {
      no_rippled_connection: {
        success: false,
        error_type: 'connection',
        error: 'Cannot connect to rippled'
      },
      rippled_busy: {
        success: false,
        error_type: 'transaction',
        error: 'Rippled Busy',
        message: 'The server is experiencing heavy load and is unable to process the request right now. Please try again.'
      },
      server: {
        success: false,
        error_type: 'server'
      }
    },

    invalid_requests: {
      no_paths_found: {
        success: false,
        error_type: 'invalid_request',
        error: 'No paths found',
        message: 'Please ensure that the source_account has sufficient funds to execute the payment. If it does there may be insufficient liquidity in the network to execute this payment right now'
      },
      transaction_not_found: {
        success: false,
        error_type: 'invalid_request',
        error: 'Transaction not found',
        message: 'A transaction hash was not supplied and there were no entries matching the client_resource_id.'
      }
    }
  },
  outgoing_record: {
    to_amount: 0.0019399999999999999,
    from_amount: 0.002,
    to_address_id: 820,
    from_address_id: 623,
    to_currency: 'XRP',
    to_issuer: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
    from_currency: 'XRP',
    from_issuer: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
    state: 'outgoing',
    external_transaction_id: 169,
    direction: 'from-ripple'
  },
  outgoing_record_invoice_id_memos: {
    to_amount: 0.0019399999999999999,
    from_amount: 0.002,
    to_address_id: 1,
    from_address_id: 1,
    to_currency: 'XRP',
    to_issuer: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
    from_currency: 'XRP',
    from_issuer: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
    state: 'outgoing',
    external_transaction_id: 169,
    direction: 'from-ripple',
    invoice_id: '03AC674216F3E15C761EE1A5E255F067953623C8B388B4459E13F978D7C846F4',
    memos: [
      {
        MemoType: 'unformatted_memo',
        MemoData: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum是指一篇常用於排版設計領域的拉丁文文章，主要的目的為測試文章或文字在不同字型、版型下看起來的效果。Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.'
      }
    ]
  },
  successful_responses: {
    validated_payment: {
      source_account: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr',
      source_tag: '623',
      source_amount: { value: '0.001939', currency: 'XRP', issuer: '' },
      source_slippage: '0',
      destination_account: 'rp4u5gEskM8DtBZvonZwbu6dspgVdeAGM6',
      destination_tag: '',
      destination_amount: { value: '0.001939', currency: 'XRP', issuer: '' },
      invoice_id: '',
      paths: '[]',
      no_direct_ripple: false,
      partial_payment: false,
      direction: 'outgoing',
      state: 'validated',
      result: 'tesSUCCESS',
      ledger: '',
      hash: '9DDCEBAB6D751C22755F9303B59E1E2FDC8308B551A4C5AE89343BD6F2255169',
      timestamp: '2014-06-30T00:28:46.000Z',
      fee: '0.000012',
      source_balance_changes: [],
      destination_balance_changes: []
    }
  },
  requests: {
    payment: {
      source_account: 'rscJF4TWS2jBe43MvUomTtCcyrbtTRMSNr',
      source_tag: '',
      source_amount: { value: '0.001939', currency: 'XRP', issuer: '' },
      source_slippage: '0',
      destination_account: 'rp4u5gEskM8DtBZvonZwbu6dspgVdeAGM6',
      destination_tag: '0',
      destination_amount: { value: '0.001939', currency: 'XRP', issuer: '' },
      invoice_id: '',
      paths: '[]',
      partial_payment: false,
      no_direct_ripple: false
    },
    pending_payment: {
      success: true,
      client_resource_id: '1',
      status_url: 'https://api.ripple.com/v1/accounts/rDmSZbgLbw7qkkgDXMWoiSQX7VZ6KknWcL/payments/1'
    }
  },
  notifications: {
    payment: { account: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
      type: 'payment',
      direction: 'incoming',
      state: 'validated',
      result: 'tesSUCCESS',
      ledger: '10442591',
      hash: '3639892C4525F04E4E6E7AAD6F729C9A74E96AD3616A8F6689D1FCA330EAFF79',
      timestamp: '2014-12-10T23:39:20.000Z',
      transaction_url: 'https://api.ripple.com/v1/accounts/rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz/payments/3639892C4525F04E4E6E7AAD6F729C9A74E96AD3616A8F6689D1FCA330EAFF79',
      previous_hash: '7126588883E62A61F45E20AF22266D3A4403507DBCEF17F11E049EB3A6B4349A',
      previous_notification_url: 'https://api.ripple.com/v1/accounts/rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz/notifications/7126588883E62A61F45E20AF22266D3A4403507DBCEF17F11E049EB3A6B4349A',
      next_hash: 'E6DC30EFB39E8F11F361387B85CF8DA1FFF39D0376512084E41BDED1405AD571',
      next_notification_url: 'https://api.ripple.com/v1/accounts/rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz/notifications/E6DC30EFB39E8F11F361387B85CF8DA1FFF39D0376512084E41BDED1405AD571',
      next_notification_hash: 'E6DC30EFB39E8F11F361387B85CF8DA1FFF39D0376512084E41BDED1405AD571' },
    non_payment: { account: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
      type: 'payment',
      direction: 'incoming',
      state: 'validated',
      result: 'tesSUCCESS',
      ledger: '10442786',
      hash: 'E6DC30EFB39E8F11F361387B85CF8DA1FFF39D0376512084E41BDED1405AD571',
      timestamp: '2014-12-10T23:53:00.000Z',
      transaction_url: 'https://api.ripple.com/v1/accounts/rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz/payments/E6DC30EFB39E8F11F361387B85CF8DA1FFF39D0376512084E41BDED1405AD571',
      previous_hash: '3639892C4525F04E4E6E7AAD6F729C9A74E96AD3616A8F6689D1FCA330EAFF79',
      previous_notification_url: 'https://api.ripple.com/v1/accounts/rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz/notifications/3639892C4525F04E4E6E7AAD6F729C9A74E96AD3616A8F6689D1FCA330EAFF79',
      next_hash: '317BEF6ABC28E0CA6C09FD654FBAA401B52D962997B404B3A4849BE960AFC2F6',
      next_notification_url: 'https://api.ripple.com/v1/accounts/rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz/notifications/317BEF6ABC28E0CA6C09FD654FBAA401B52D962997B404B3A4849BE960AFC2F6',
      next_notification_hash: '317BEF6ABC28E0CA6C09FD654FBAA401B52D962997B404B3A4849BE960AFC2F6' }
  }
};
